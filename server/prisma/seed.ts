import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for (const modelName of modelNames) {
        const model = prisma[modelName as keyof typeof prisma] as any;

        if (!model?.deleteMany) {
            console.warn(`⚠️ Skipping unknown model: ${modelName}`);
            continue;
        }

        await model.deleteMany({});
        console.log(`✅ Cleared data from ${modelName}`);
    }
}

async function main() {
    const dataDirectory = path.join(__dirname, "seedData");

    const orderedFileNames = [
        "team.json",
        "project.json",
        "projectTeam.json",
        "user.json",
        "task.json",
        "attachment.json",
        "comment.json",
        "taskAssignment.json"
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const modelName = path.basename(fileName, path.extname(fileName));
        const model = prisma[modelName as keyof typeof prisma] as any;

        if (!model?.create) {
            console.warn(`⚠️ Skipping unknown model: ${modelName}`);
            continue;
        }

        try {
            for (const data of jsonData) {
                if (modelName.toLowerCase() === "user" && data.teamId) {
                    data.team = { connect: { id: data.teamId } };
                    delete data.teamId; // remove invalid field
                }
                await model.create({ data });
            }
            console.log(`✅ Seeded data into ${modelName}`);
        } catch (error) {
            // @ts-ignore
            console.error(`❌ Error seeding data for ${modelName}:`, error.message);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

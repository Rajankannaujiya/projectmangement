import React from 'react'


export const Error = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit max-w-[90%] px-4 py-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 shadow-lg" role="alert">
      <span className="font-medium">Error!</span> {errorMessage}
    </div>
  );
};


export const Success = ({ successMessage }: { successMessage: string })=>{
 return (<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success!</span> {successMessage}
</div>)
}
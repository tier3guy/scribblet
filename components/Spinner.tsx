export default function Spinner() {
    return (
        <svg className='animate-spin h-5 w-5 mr-3 text-orange-500' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' strokeWidth='4'></circle>
            <path
                className='opacity-75'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291A7.962 7.962 0 0120 12h4c0-3.042-1.135-5.824-3-7.938l-3 2.647z'
            ></path>
        </svg>
    );
}

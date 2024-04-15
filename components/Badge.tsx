interface IBadge {
    label: string;
}

export default function Badge({ label }: IBadge) {
    return (
        <div className='rounded-full py-2 px-8 text-xs bg-gray-100 cursor-pointer hover:bg-gray-200'>
            <p className='text-gray-500  hover:text-gray-600'>{label}</p>
        </div>
    );
}

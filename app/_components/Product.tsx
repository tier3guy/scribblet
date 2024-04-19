import Image from 'next/image';

export default function Product() {
    return (
        <section className='flex flex-col items-center justify-center'>
            <Image
                src={'/dashboard-image.png'}
                width={850}
                height={1000}
                className='border-[10px] rounded-xl'
                objectFit='contain'
                alt='product-demo'
            />
        </section>
    );
}

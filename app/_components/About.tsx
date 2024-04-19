export default function About() {
    return (
        <section className='flex flex-col gap-10 py-20 px-[10%]' id='about'>
            <h1 className='font-bold text-4xl text-gray-400'>
                <span className='text-orange-500'>about</span> the product
            </h1>
            <div className='flex flex-col gap-4'>
                <p>
                    Welcome to Scribblet, the ultimate platform designed to revolutionize the way
                    you create and collaborate on documentation. With Scribblet, you can seamlessly
                    blend markdown documentation with dynamic image illustrations using our
                    innovative draw board feature.
                </p>
                <p>
                    Our platform caters to engineers, developers, and creators who require a
                    versatile tool for sketching software architectures, workflows, and more, right
                    alongside their documentation. Whether you are working solo or with a team,
                    Scribblet offers the flexibility and functionality you need to bring your ideas
                    to life.
                </p>
                <p>
                    As advocates for open-source and community-driven innovation, Scribblet is
                    entirely open-sourced. We invite developers to clone and customize our platform,
                    making it even more tailored to your specific requirements. Join us on our
                    mission to redefine documentation for the modern age!
                </p>
            </div>
        </section>
    );
}

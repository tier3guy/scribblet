import Navbar from './Navbar';
import Table from './Table';

export default function Board() {
    return (
        <div className='h-full w-full overflow-hidden flex flex-col divide-y-[1.5px]'>
            <div>
                <Navbar />
            </div>
            <Table />
        </div>
    );
}

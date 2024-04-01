interface SummaryCardProps {
    title: string;
    value: string;
    unit: string;
    increase?: boolean;
}
const SummaryCard: React.FC<SummaryCardProps> = ({ title, unit, value }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-md p-4 w-full md:w-64 lg:w-72 h-44 shadow-md">
            <h1 className="text-xl font-semibold mb-2">{title}</h1>
            <h2 className="text-5xl text-center pt-3 font-medium text-gray-600">
                {value}
            </h2>
            <p className="text-center pt-4">{unit ? `(${unit})` : ""}</p>
        </div>
    );
};

export default SummaryCard;

export interface FilterMenuProps {
    title: string;
    func: () => void;   
}

const FilterMenu:React.FC<FilterMenuProps> = ({title, func}) => {
    return (
        <div onClick={func} className="hover:bg-slate-300 p-2">
            <p>{title}</p>
        </div>
    )
}

export default FilterMenu;
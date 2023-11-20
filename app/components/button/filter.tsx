import Popup from "reactjs-popup";
import FilterMenu, { FilterMenuProps } from "./filter-menu";

export interface FilterButtonProps {
  data: FilterMenuProps[];
}

const FilterButton: React.FC<FilterButtonProps> = ({ data }) => {
  return (
    <Popup
      trigger={
        <div>
          <button>
            <img src="/svg/filter.svg" />
          </button>
        </div>
      }
      position="bottom center"
    >
      {data.map((item) => {
        return <FilterMenu title={item.title} func={item.func} />;
      })}
    </Popup>
  );
};

export default FilterButton;

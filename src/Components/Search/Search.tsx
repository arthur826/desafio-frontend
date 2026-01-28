import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDown } from '@fortawesome/free-solid-svg-icons'

import {
    SearchContainer,
    SearchInput,
    OrderButton
  } from "./styles"


type SearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
  order: 'asc' | 'desc';
  onToggleOrder: () => void;
};


function Search({ search, onSearchChange, order, onToggleOrder }: SearchProps) {
    return (
        <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Buscar colaborador pelo nome..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <OrderButton onClick={onToggleOrder}>
                    Ordenar ({order === "asc" ? "A - Z" : "Z - A"})
                    <FontAwesomeIcon
                        icon={faUpDown}
                        style={{ color: "#2c70c8", fontSize: "18px" }}
                    />
                </OrderButton>
        </SearchContainer>
    )
}

export default Search;
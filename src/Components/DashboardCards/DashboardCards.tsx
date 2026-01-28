import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faUsers,
  faBuilding,
  faCity
} from '@fortawesome/free-solid-svg-icons'

import {
  CardsContainer,
  CardItem,
  CardTitle,
  CardValue,
} from "./styles";

type DashboardCardsProps = {
  totalColaboradores: number;
  totalCidades: number;
  totalEmpresas: number;
};

function DashboardCards({ totalColaboradores, totalCidades, totalEmpresas }: DashboardCardsProps) {
  return (
    <CardsContainer>
                <CardItem>
                    <FontAwesomeIcon icon={faUsers} style={{ color: '#2c70c8', fontSize: '34px' }} />
                    <div>
                        <CardTitle>Total de colaboradores</CardTitle>
                        <CardValue>{totalColaboradores}</CardValue>
                    </div>
                </CardItem>
                 <CardItem>
                    <FontAwesomeIcon icon={faCity} style={{ color: '#2c70c8', fontSize: '34px' }} />
                    <div>
                        <CardTitle>Cidades Diferentes</CardTitle>
                        <CardValue>{totalCidades}</CardValue>
                    </div>
                </CardItem>
                 <CardItem>
                    <FontAwesomeIcon icon={faBuilding} style={{ color: '#2c70c8', fontSize: '34px' }} />
                    <div>
                        <CardTitle>Total de Empresas</CardTitle>
                        <CardValue>{totalEmpresas}</CardValue>
                    </div>
                </CardItem>
            </CardsContainer>
  );
}

export default DashboardCards;
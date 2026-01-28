import {
    HeaderContainer,
    Text,
    Title,
    Subtitle,
    UserPhoto,
    UserImage
  } from "./styles"

type HeaderProps = {
  title: string;
  subtitle: string;
  userPhoto: string;
};

function Header({ title, subtitle, userPhoto }: HeaderProps) {
    return (
         <HeaderContainer>
            <Text>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Text>
            <UserPhoto>
                <UserImage src={userPhoto} alt="Foto do usuário" />
            </UserPhoto>
        </HeaderContainer>
    );
}

export default Header;
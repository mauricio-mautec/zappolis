import * as S from './styles'

const Main = ({
  title = 'ZappoliS',
  description = 'Commerce Club Community'
}) => (
  <S.Wrapper>
    <S.Logo
      src="/img/zappolis.png"
      alt="Imagem mostra um home de óculos por detrás do escrito ZappoliS"
    />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <S.Illustration
      src="/img/zappolis.png"
      alt="Um homem olhando para o computador"
    />
  </S.Wrapper>
)

export default Main

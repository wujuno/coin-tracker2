import styled from "styled-components";
import {useQuery} from "@tanstack/react-query";
import {fetchCoins} from "../api";
import {Link} from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    heigth: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px 0px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.cardBgColor};
    margin-bottom: 10px;
    border-radius: 15px;
    border: 1px solid white;
    a {
        transition: color 0.3s ease-in-out;
        display: flex;
        padding: 20px;
        align-itmes:center;
        span {
            transform: translateY(4px); 
        }
    }
    &:hover {
        a {
            color:${props => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
    color:${props => props.theme.accentColor};
    font-size: 48px;
`;
const Loading = styled.h1`
    color:${props => props.theme.textColor};
    font-size: 48px;
    text-align: center;
`;
const Img = styled.img`
    width:25px;
    heigth:25px;
    margin-right:10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string, 
}

function Coins (){
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const {isLoading, data} = useQuery<ICoin[]>(["allCoins"], fetchCoins)
    return (
            <Container>
                <Helmet>
                    <title>코인</title>
                </Helmet>
                <Header>
                    <Title>코인</Title>
                    <button onClick={toggleDarkAtom}>Toggle Mode</button>
                </Header>
            <div>
                {isLoading 
                ? <Loading>Loading...</Loading>  
                : <CoinList>
                    {data?.slice(0,100).map(coin => <Coin>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name}
                        }}>
                        <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                        <span>
                            {coin.name} &rarr;
                        </span>
                        </Link>
                    </Coin>)}
                </CoinList> 
                }
            </div>
            </Container>
    )
}
export default Coins;
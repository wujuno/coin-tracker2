import {useQuery} from "@tanstack/react-query";
import {fetchCoinTickers} from "../api";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
  border: 1px solid white;
  border-radius: 3px;
  border-width: 3px;
  padding: 15px 20px;
`;
const Header = styled.header`
  text-align: center;
  font-weight: 700;
`;

const CoinPrice = styled.div`
  margin-top: 15px;
  line-height:25px;
  font-size: 17px

`;


interface PriceProps {
    coinId: string;
  }

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
}

function Price ({coinId}:PriceProps){
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers",coinId], ()=>fetchCoinTickers(coinId),{ refetchInterval: 3000});
    return (
        <div>
          {tickersLoading 
          ? "Loading Price..." 
          : 
          <Container>
          <Header>
            <p>{tickersData?.name} Price</p>
          </Header>
          <CoinPrice>
          <p>ath_date: {tickersData?.quotes.USD.ath_date}</p>
          <p>ath_price: ${(tickersData?.quotes.USD.ath_price)?.toFixed(3)}</p>
          <p>percent_change_15m: {tickersData?.quotes.USD.percent_change_15m+"%"}</p>
          <p>percent_change_1h: {tickersData?.quotes.USD.percent_change_1h+"%"}</p>
          <p>percent_change_6h: {tickersData?.quotes.USD.percent_change_6h+"%"}</p>
          <p>percent_change_24h: {tickersData?.quotes.USD.percent_change_24h+"%"}</p>
          <p>percent_change_7d: {tickersData?.quotes.USD.percent_change_7d+"%"}</p>
          <p>percent_change_30d: {tickersData?.quotes.USD.percent_change_30d+"%"}</p>
          </CoinPrice>
        </Container>
        } 
        </div>
    )
}
export default Price;
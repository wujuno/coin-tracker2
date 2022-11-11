import {useQuery} from "@tanstack/react-query"
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
    coinId: string;
  }
interface IHistoricalData {
    time_open: number,
    time_close: number,
    open: string,
    high: string,
    low: string,
    close: string,
    volume: string,
    market_cap: number
}

function Chart ({coinId}:ChartProps){
    const isDark = useRecoilValue(isDarkAtom);
    const {isLoading, data} = useQuery<IHistoricalData[]>(["ohlcv", coinId],()=>fetchCoinHistory(coinId),{refetchInterval: 10000});
    const excepData = data ?? [];
    const chartData = excepData.map(data => { 
      return {
        x : data.time_close,
        y : [data.open, data.high, data.low, data.close]
      }
    })
    return (<div>
        {isLoading 
        ? "Loading Chart..." 
        : <ApexChart 
          type="candlestick"
          series={[
            {
              data: chartData
            }]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart:{
              height: 500,
              width:500,
              toolbar: {
                show:false,
              },
              background: "transparent"
            },
            grid : {show: false},
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {show: false},
              axisTicks:{show:false},
              labels: {show:false}
            },
          }}
          />
        }
      </div>) ;
}
export default Chart;
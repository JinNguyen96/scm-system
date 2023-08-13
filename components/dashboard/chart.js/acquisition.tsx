import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  InteractionItem,
  BarElement,
} from "chart.js/auto";
import type { ChartData, ChartOptions } from "chart.js";
import axios from "axios";
import CryptoSummary from "./CryptoSummary";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
  Line,
} from "react-chartjs-2";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { bitcoinChart, chartData } from "./chartData";
import moment from "moment";
const queryClient = new QueryClient();

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);
export type Crypto = {
  range: string;
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
};
export default function Chartjs() {
  return (
    <QueryClientProvider client={queryClient}>
      <Chartks />
    </QueryClientProvider>
  );
}
function Chartks() {
  const [cryptos, setCrypto] = useState<Crypto[] | null>(null);
  const [selected, setSeleted] = useState<Crypto | null>();
  const [range, setRange] = useState<string>("30");
  const [coinData, setCoinData] = useState<ChartData>();
  const [options, setOption] = useState<ChartOptions>({
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: `Coin Crypto Chart`,
      },
    },
  });
  // const { data, isLoading } = useQuery(
  //   "list-query",
  //   () => {
  //     axios
  //       .get(
  //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=vnd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  //       )
  //       .then((response) => {
  //         setCrypto(response.data);
  //       });
  //   },
  //   {
  //     cacheTime: Infinity,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  const handleOnchange = useCallback(
    async (e: any) => {
      const c: any = chartData.find((x) => {
        return x.id === e.target.value;
      });
      setSeleted(c);
      console.log(selected);

      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=vnd&days=${range}&interval=daily`
        )
        .then((response) => {
          //setCoinData
          // setCoinData({
          //   labels: response.data.prices.map((price: number[]) => {
          //     return moment.unix(price[0] / 1000).format("MM-DD");
          //   }),
          //   datasets: [
          //     {
          //       type: "bar" as const,
          //       label: "Dataset 1",
          //       data: response.data.prices.map((price: number[]) => {
          //         return price[1] / 100;
          //       }),
          //       borderColor: "rgb(255, 99, 132)",
          //       backgroundColor: "rgba(255, 99, 132, 0.5)",
          //     },
          //     {
          //       type: "line" as const,
          //       label: "Dataset 2",
          //       data: response.data.market_caps.map((market_caps: number[]) => {
          //         return market_caps[2] ;
          //       }),
          //       borderColor: "yellow",
          //       backgroundColor: "yellow",
          //     },
          //     {
          //       type: "bar" as const,
          //       label: "Dataset 3",
          //       data: response.data.total_volumes?.map(
          //         (total_volume: number[]) => {
          //           return total_volume[2] ;
          //         }
          //       ),
          //       borderColor: "green",
          //       backgroundColor: "green",
          //     },
          //   ],
          // });
          setCoinData({
            labels: response.data.prices.map((price: number[]) => {
              return moment.unix(price[0] / 1000).format("MM-DD");
            }),
            datasets: [
              {
                label: "Giá (vnd)",
                type: "line" as const,
                data: response.data.prices.map((price: number[]) => {
                  return price[1] * 100;
                }),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                type: "bar" as const,
                label: "Vốn hoá thị trường",
                data: response.data.market_caps.map((market_cap: number[]) => {
                  return market_cap[1] / 1100000;
                }),
                borderColor: "yellow",
                backgroundColor: "yellow",
              },
              {
                type: "bar" as const,
                label: "Tổng volume",
                data: response.data.total_volumes.map((total_volume: number[]) => {
                  return total_volume[1] / 10000;
                }),
                borderColor: "blue",
                backgroundColor: "blue",
              },
            ],
          });
        });
      console.log(range);
    },
    [coinData, selected, range]
  );
  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(coinData?.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(coinData?.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  useEffect(() => {}, []);
  return (
    <div className="chartjs">
      <select onChange={handleOnchange}>
        {chartData.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => {
          setRange(e.target.value);
        }}
      >
        <option value="30">30 days</option>
        <option value="7">7 days</option>
        <option value="1">1 day</option>
      </select>
      {selected ? <CryptoSummary crypto={selected} range={range} /> : null}
      {coinData ? (
        <div>
          <Chart
            options={options}
            data={coinData}
            type="bar"
            onClick={onClick}
            ref={chartRef}
          />
        </div>
      ) : null}
    </div>
  );
}

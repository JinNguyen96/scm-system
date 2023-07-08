import { Crypto } from "./acquisition";

interface AppProps {
  crypto: Crypto;
  range: string;
}
export default function CryptoSummary({
  crypto,
  range,
}: AppProps): JSX.Element {
  return (
    <>
      <div className="d-flex justify-center align-items-center gap-3">
        <img
          src={crypto.image}
          alt={crypto.name}
          style={{ widows: 30, height: 30 }}
        />
        <p>
          {crypto.name +
            " $ " +
            crypto.current_price.toFixed(3) +
            " in " +
            range}
        </p>
      </div>
    </>
  );
}

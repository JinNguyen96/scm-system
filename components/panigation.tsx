interface Props {
  currentPage: any;
  changePage: any;
  prePage: any;
  numbers: any;
  nextPage: any;
}
const Pagination = ({
  currentPage,
  changePage,
  prePage,
  numbers,
  nextPage,
}: Props) => {
  return (
    <div className="flex justify-content-center  w-100">
      <nav>
        <ul className="pagination mt-3">
          <li className="page-item cursor-pointer" onClick={prePage}>
            <span className="page-link cursor-pointer" >
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 9L1 5L5 1"
                  stroke="#343A40"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </li>
          {numbers.map((n: number, i: number) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <span
                className="page-link cursor-pointer"
                onClick={() => changePage(n)}
              >
                {n}
              </span>
            </li>
          ))}
          <li className="page-item cursor-pointer" onClick={nextPage}>
            <span className="page-link cursor-pointer" >
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 9L5 5L1 1"
                  stroke="#343A40"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;

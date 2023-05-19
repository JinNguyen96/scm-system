import React, { useState } from "react";
import Link from "next/link";
import "react-calendar/dist/Calendar.css";
import Router from "next/router";

export default function Sidebar() {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed  flex top-0 z-40 h-screen   bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="side-bar-fixed h-full">
          <ul
            className="flex flex-column align-items-center gap-5"
            style={{ paddingLeft: "0" }}
          >
            <div className=" flex flex-column align-items-center gap-5">
              <li>
                <a href="#" className="side-bar-active">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.93335 1.87409C0.93335 0.859588 1.73592 0.0371704 2.72594 0.0371704H6.31113C7.30115 0.0371704 8.10372 0.859588 8.10372 1.87409V5.54793C8.10372 6.56244 7.30115 7.38485 6.31113 7.38485H2.72594C1.73592 7.38485 0.93335 6.56244 0.93335 5.54793V1.87409ZM6.31113 1.87409H2.72594V5.54793H6.31113V1.87409ZM9.89631 1.87409C9.89631 0.859588 10.6989 0.0371704 11.6889 0.0371704H15.2741C16.2641 0.0371704 17.0667 0.859588 17.0667 1.87409V5.54793C17.0667 6.56244 16.2641 7.38485 15.2741 7.38485H11.6889C10.6989 7.38485 9.89631 6.56244 9.89631 5.54793V1.87409ZM15.2741 1.87409H11.6889V5.54793H15.2741V1.87409ZM0.93335 11.0587C0.93335 10.0442 1.73592 9.22178 2.72594 9.22178H6.31113C7.30115 9.22178 8.10372 10.0442 8.10372 11.0587V14.7325C8.10372 15.747 7.30115 16.5695 6.31113 16.5695H2.72594C1.73592 16.5695 0.93335 15.747 0.93335 14.7325V11.0587ZM6.31113 11.0587H2.72594V14.7325H6.31113V11.0587ZM9.89631 11.0587C9.89631 10.0442 10.6989 9.22178 11.6889 9.22178H15.2741C16.2641 9.22178 17.0667 10.0442 17.0667 11.0587V14.7325C17.0667 15.747 16.2641 16.5695 15.2741 16.5695H11.6889C10.6989 16.5695 9.89631 15.747 9.89631 14.7325V11.0587ZM15.2741 11.0587H11.6889V14.7325H15.2741V11.0587Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 2.5L1.66669 10H4.16669V16.6667H9.16669V11.6667H10.8334V16.6667H15.8334V10H18.3334L10 2.5ZM14.1667 15H12.5V10H7.50002V15H5.83335V8.49167L10 4.74167L14.1667 8.49167V15Z"
                      fill="#DFEBE9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.83331 8.49164V15H7.49998V9.99997H12.5V15H14.1666V8.49164L9.99998 4.74164L5.83331 8.49164Z"
                      fill="#0A5F59"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a href="#">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M10.8222 5.43378C8.84218 5.43378 7.23704 7.07862 7.23704 9.10763C7.23704 11.1366 8.84218 12.7815 10.8222 12.7815C12.8023 12.7815 14.4074 11.1366 14.4074 9.10763C14.4074 7.07862 12.8023 5.43378 10.8222 5.43378ZM5.44444 9.10763C5.44444 6.06412 7.85216 3.59686 10.8222 3.59686C13.7923 3.59686 16.2 6.06412 16.2 9.10763C16.2 12.1511 13.7923 14.6184 10.8222 14.6184C7.85216 14.6184 5.44444 12.1511 5.44444 9.10763ZM7.23704 18.2922C5.752 18.2922 4.54815 19.5259 4.54815 21.0476C4.54815 21.5549 4.14686 21.9661 3.65185 21.9661C3.15684 21.9661 2.75555 21.5549 2.75555 21.0476C2.75555 18.5114 4.76198 16.4553 7.23704 16.4553H14.4074C16.8825 16.4553 18.8889 18.5114 18.8889 21.0476C18.8889 21.5549 18.4876 21.9661 17.9926 21.9661C17.4976 21.9661 17.0963 21.5549 17.0963 21.0476C17.0963 19.5259 15.8924 18.2922 14.4074 18.2922H7.23704Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </a>
              </li>
            </div>
            <li className="mb-5">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 align-self-end"
               
                role="menuitem"
                onClick={() => {
                  document.cookie = "USER_LOGIN=";
                  localStorage.removeItem("userToken");
                  Router.reload();
                }}
              >
                <img src="logout.svg" alt="logout icon" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 side-bar-hover">
          <ul className="space-y-2 ">
            <li className="flex ml-3 items-center p-2">
              <img src="scm.svg" alt="scm logo" />
            </li>
            <li>
              <Link
                href="dashboard"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="role"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Role</span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="type"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Type</span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="admin-template"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="permission"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  User information
                </span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ml-3 whitespace-nowrap">...</span>
                <svg
                  width="7"
                  height="10"
                  viewBox="0 0 7 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5.15094 4.78082L1 8.56164"
                    stroke="#1C1D22"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

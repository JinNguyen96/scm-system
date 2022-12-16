

export default function FormSendMailRequest (){
  return( 
  <div className="m-auto h-screen  ">
    <div className="  flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="py-20 px-10 border-none  shadow-2xl rounded-lg" style={{width:"444px"}}>
      <div className="w-full max-w-md space-y-6 h-full m-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
           Reset your password
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="py-2">
                    <label htmlFor="email-address" className="font-light my-3">
                    Enter your user account's verified email address and we will send you a password reset link.
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full placeholder-gray-300 border border-gray-300 px-7 py-2 text-gray-900 focus:z-10  focus:outline-none sm:text-sm rounded-md shadow-sm mt-2"
                      placeholder="Enter your email address"
                      style={{ borderRadius: 24 }}
                    />
                  </div>

          <div>
            <button
              type="submit"
              className="btnEffect group  flex w-full justify-center rounded-md border  bg-indigo-600 py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send password reset email
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
  )
}
import Heading from "../../../ReuseableCompo/Heading";

const FaQ = () => {
  return (
    <div>
      <section className=" bg-base-200">
        <div className=" w-[95%] mx-auto md:w-[90%] lg:w-[86%] my-20 flex flex-col justify-center p-4 md:p-8">

          <Heading description={'Some Asked QnA About Us '} title1={'Frequently Asked Questions'}></Heading>
          {/* main content  */}
          <div className=" flex flex-col-reverse lg:flex-row gap-5 ">
            <div className="flex flex-col w-full lg:w-[60%] divide-y sm:px-8 lg:px-10 divide-gray-600 gap-3">
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                What is Learn Mentor Gate?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Learn Mentor Gate is an online platform that connects learners with experienced mentors in various fields to facilitate personalized learning and professional development.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                How does Learn Mentor Gate work?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Users can browse and enroll in courses, access course materials online, and complete assessments to earn certificates.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                What types of courses are available?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  The platform offers courses in a wide range of subjects, including technology, business, arts, science, personal development, and more.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                Can I access my courses at any time?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Yes, once you enroll in a course, you can access the materials anytime and complete the course at your own pace.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                Do I get a certificate after completing a course?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Yes, most courses offer a certificate of completion, which you can download and share on professional networks like LinkedIn.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                How do I pay for a course?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Payments can be made via credit card, PayPal, or other payment methods supported by the platform during the checkout process.
                  </p>
                </div>
              </details>
              <details className=" border border-gray-300 rounded-md pl-2">
                <summary className="py-2 font-bold   outline-none cursor-pointer hover:underline">
                How is my personal information protected?
                </summary>
                <div className="pl-7 pb-4">
                  <p className="">
                  Learn Mentor Gate uses secure encryption and follows strict privacy policies to protect your personal information. Detailed information can be found in the Privacy Policy section of the website.
                  </p>
                </div>
              </details>
             
            </div>
            <div className="w-full lg:w-[35%]">
              <img src="https://img.freepik.com/free-vector/curiosity-search-concept-illustration_114360-11031.jpg?w=740&t=st=1716631756~exp=1716632356~hmac=9678f37fe4a96f23e3b041c9f2ce4f962b2c7352711d255d2262a05da450f477" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaQ;

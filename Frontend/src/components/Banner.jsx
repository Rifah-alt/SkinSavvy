const Banner = () => {

  return (
    <div
      className={`relative bg-[url('/beautybanner2.jpg')] bg-no-repeat bg-cover bg-center h-[75vh] px-[200px] `}
    //   style={{backgroundImage: `url(${banner.img})`}}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col text-white w-[50%] pt-[10%]">
        <span className="text-[30px] mt-3">banner_subtitle</span>
        <h1 className="text-3xl mt-3">banner_title</h1>
        <div className="flex items-center mt-[20px]">
          <button className="bg-[#e48bcd] p-[10px] w-[200px] text-white cursor-pointer mr-9">
            Shop Now
          </button>
          <button className="bg-gray-500 p-[10px] w-[200px] text-white cursor-pointer">
            CALL: +(123) 456 789
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
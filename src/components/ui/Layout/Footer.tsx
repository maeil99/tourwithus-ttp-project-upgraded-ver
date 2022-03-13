const Footer = () => {
  return (
    <footer className="bg-[#4E95C3]">
      <div className="grid grid-cols-3 text-white pt-[80px] font-bold text-[18px]">
        <p>Company</p>
        <p>Contact</p>
        <p>More</p>
      </div>
      <div className="grid grid-cols-3 text-white pt-[20px] text-[18px]">
        <div >
          <p>About</p>
          <p>Careers</p>
          <p>Mobile</p>
          <p>Discover</p>
          <p>How we work</p>
          <p>Why travellers choose TourWithUs</p>
          <p>Sustainability</p>
        </div>
        <div >
          <p>Help/FAQ</p>
          <p>Press</p>
          <p>Affiliates</p>
          <p>Advertise with us</p>
        </div>
        <p>Website Settings</p>
      </div>
      <div className=" h-[134px] flex justify-center items-center">
        <div className="text-gray-300 flex space-x-5">
          <p>Privacy</p>
          <p>Terms & Conditions</p>
         <p> &copy;2022TourWithUs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

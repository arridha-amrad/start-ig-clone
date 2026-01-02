export const FooterAuth = () => {
  return (
    <footer className="w-full md:px-10 p-4 flex flex-col items-center justify-center md:gap-8 gap-2 mx-auto">
      <ul className="flex justify-center md:gap-4 gap-2 text-xs flex-wrap text-foreground/50">
        <li className="w-max">Meta</li>
        <li className="w-max">About</li>
        <li className="w-max">Blog</li>
        <li className="w-max">Jobs</li>
        <li className="w-max">Help</li>
        <li className="w-max">API</li>
        <li className="w-max">Privacy</li>
        <li className="w-max">Terms</li>
        <li className="w-max">Locations</li>
        <li className="w-max">Instagram Lite</li>
        <li className="w-max">Meta AI</li>
        <li className="w-max">Threads</li>
        <li className="w-max">Contact Uploading &amp; Non-Users</li>
        <li className="w-max">Meta Verified</li>
        <li className="w-max">Meta in Indonesia</li>
      </ul>
      <div className="text-xs text-foreground/50">
        <p>© {new Date().getFullYear()} Instagram from Meta</p>
      </div>
    </footer>
  );
};

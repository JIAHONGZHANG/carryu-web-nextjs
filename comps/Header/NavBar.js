import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav>
      <ul>
        <Link href="/">首页</Link>
        <Link href="/events">留学申请</Link>
        <Link href="/annual">澳洲移民</Link>
        <Link href="/team">澳洲签证</Link>
        <Link href="/posts">新闻快递</Link>
        <Link href="/sign-up">往期活动</Link>
        <Link href="/sign-up">关于我们</Link>
      </ul>

      {/* Second Nav */}
      {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
    </nav>
  );
};
export default Navbar;

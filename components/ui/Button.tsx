"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";

// 버튼 속성과 커스텀 속성 사용
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

//컴포넌트에 전달된 모든 “나머지” 속성들을 그대로 <button> 요소에 옮겨 붙이는 역할
export const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button
    {...props}
    className={`px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    {children}
  </button>
);

// 프롭스 객체는
/*
{
  onClick: () => alert("클릭!"),
  disabled: true,
  title: "저장 버튼"
}
 */
// 여기를 나타냄 속성 여러개를 ...로 한방에 넘기는 역할
//{children} 버튼 안에 있는 내용
// /* <Button>여기에 있는 내용</Button> */
// 그 안에 있는 자식을 그대로 물려 받을거야

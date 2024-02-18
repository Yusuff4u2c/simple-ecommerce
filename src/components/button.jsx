/* eslint-disable react/prop-types */
function Button({
  title,
  children,
  iconLeft,
  iconRight,
  className,
  loading,
  disabled,
  ...otherProps
}) {
  return (
    <button
      className={`py-2 px-3 mt-0 h-11 bg-purple-500 text-white w-full rounded-sm font-primary font-semibold text-xl flex justify-center items-center  hover:bg-purple-600 disabled:bg-purple-600/20 disabled:cursor-not-allowed cursor-pointer ${className}`}
      aria-label="button"
      disabled={loading || disabled}
      {...otherProps}
    >
      {!!iconLeft && iconLeft}
      {children ? children : title}
      {!!iconRight && iconRight}
    </button>
  );
}

export default Button;

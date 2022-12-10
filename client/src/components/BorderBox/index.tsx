import cx from "classnames";

import React from "react";
import "./styles.scss";

export const BorderBox: React.FC<{
  isFocus?: boolean;
  children: any;
  single?: boolean;
}> = React.memo(({ children, isFocus, single }) => {
  return (
    <div
      className={cx("box", {
        "search--active": isFocus,
      })}
    >
      {!single && (
        <>
          <div className="extra-border outer-border"></div>
          <div className="extra-border inner-border"></div>
        </>
      )}

      <div style={{ zIndex: 10, position: "relative" }}>{children}</div>
    </div>
  );
});

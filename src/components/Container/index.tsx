import React, {ReactElement} from "react";

import cn from "classnames";

import styles from './index.module.scss';
interface ContainerProps {
    children: ReactElement;
    className?: string;
}
const Container: React.FC<ContainerProps> =
    ({children, className} ) => {
    return (
        <div className={cn(styles.wrapper, className)}>{children}</div>
    )
}

export default Container;

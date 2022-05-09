import React from 'react'
import styles from "./ToolboxMenu.module.scss"
import Link from 'next/link'
import classNames from 'classnames'
import { connect } from 'react-redux'
import IUser from 'src/interfaces/user'
import  { persistor } from "controllers/redux/store/configureStore"
import { useRouter } from 'next/router'
import storageActions from 'controllers/redux/actions/storageActions'
interface AccountMenuProps {
    isShow: boolean;
    style?: Record<string, any>;
    userInfo: IUser;
    getUserInfo: (info: unknown) => void;
    getCart: (cartData: unknown[]) => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ 
    isShow = false,
    style = {}, 
    userInfo = null, 
    getUserInfo = () => undefined,
    getCart = () => undefined,
}): JSX.Element => {
    const router = useRouter();
    
    const handleSignInOut = ():void => {
        // Sign out
        if (userInfo && userInfo?.id) {
            localStorage.removeItem("access_token");
            persistor.purge();
            getUserInfo(null);
            getCart([]);
        } 
        // Sign in
        router.push("/auth/login");
    }
    
    return (
        <div
            className={classNames(
                styles["toolbox-popup"],
            )}
            style={{
                ...style,
            }}
        >
            <ul className={classNames(styles["account-menu"])}>
                {!userInfo && 
                    <Link href="/auth/register">
                        <li key="1" className={styles["account-menu__item"]}>
                        Register
                        </li>
                    </Link>
                }
                <li key="2" className={styles["account-menu__item"]} onClick={handleSignInOut}>
                    {!userInfo ? 'Sign In' : 'Sign Out'}
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
    getUserInfo: storageActions.getUserInfo,
    getCart: storageActions.getCart
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);

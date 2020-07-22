import React from 'react';

const styles = {
    error: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}
export default function ErrorPage(props) {
    return (
        <div className={styles.error}>
            <h2>Error Page!</h2>
            <h1>404 Page Not found</h1>
        </div>
    );
}
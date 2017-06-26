const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');
const Box = require('../box/box.jsx');
const styles = require('./record-modal.css');
const handleIcon = require('./icon--handle.svg');

const Trimmer = props => (
    <Box className={styles.trimContainer}>
        <Box
            className={classNames(styles.trimBackground, styles.startTrimBackground)}
            style={{
                width: `${props.trimStart}%`
            }}
            onMouseDown={props.onTrimStartMouseDown}
        >
            <Box className={styles.trimBackgroundMask} />
            <Box className={classNames(styles.trimLine, styles.startTrimLine)}>
                <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.startTrimHandle)}>
                    <img src={handleIcon} />
                </Box>
                <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.startTrimHandle)}>
                    <img src={handleIcon} />
                </Box>
            </Box>
        </Box>

        <Box
            className={classNames(styles.trimBackground, styles.endTrimBackground)}
            style={{
                left: `${props.trimEnd}%`,
                width: `${100 - props.trimEnd}%`
            }}
            onMouseDown={props.onTrimEndMouseDown}
        >
            <Box className={styles.trimBackgroundMask} />
            <Box className={classNames(styles.trimLine, styles.endTrimLine)}>
                <Box className={classNames(styles.trimHandle, styles.topTrimHandle, styles.endTrimHandle)}>
                    <img src={handleIcon} />
                </Box>
                <Box className={classNames(styles.trimHandle, styles.bottomTrimHandle, styles.endTrimHandle)}>
                    <img src={handleIcon} />
                </Box>
            </Box>
        </Box>
    </Box>
);

Trimmer.propTypes = {
    onTrimEndMouseDown: PropTypes.func.isRequired,
    onTrimStartMouseDown: PropTypes.func.isRequired,
    trimEnd: PropTypes.number.isRequired,
    trimStart: PropTypes.number.isRequired
};

module.exports = Trimmer;

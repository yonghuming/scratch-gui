const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const PlaybackStepComponent = require('../components/record-modal/playback-step.jsx');
const AudioBufferPlayer = require('../lib/audio/audio-buffer-player.js');

class PlaybackStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePlay',
            'handleStopPlaying',
            'handleTrimStartMouseDown',
            'handleTrimEndMouseDown',
            'handleTrimStartMouseMove',
            'handleTrimEndMouseMove',
            'handleTrimStartMouseUp',
            'handleTrimEndMouseUp'
        ]);
    }
    componentDidMount () {
        this.audioBufferPlayer = new AudioBufferPlayer(this.props.samples);
    }
    componentWillUnmount () {
        this.audioBufferPlayer.stop();
    }
    handlePlay () {
        this.audioBufferPlayer.play(this.props.trimStart, this.props.trimEnd, this.props.onStopPlaying);
        this.props.onPlay();
    }
    handleStopPlaying () {
        this.audioBufferPlayer.stop();
        this.props.onStopPlaying();
    }
    handleTrimStartMouseMove (e) {
        const dx = 100 * (e.clientX - this.initialX) / 480;
        const newTrim = Math.min(this.props.trimEnd, this.initialTrim + dx);
        this.props.onSetTrimStart(newTrim);
    }
    handleTrimEndMouseMove (e) {
        const dx = 100 * (e.clientX - this.initialX) / 480;
        const newTrim = Math.max(this.props.trimStart, this.initialTrim + dx);
        this.props.onSetTrimEnd(newTrim);
    }
    handleTrimStartMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimStartMouseMove);
        window.removeEventListener('mouseup', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseUp () {
        window.removeEventListener('mousemove', this.handleTrimEndMouseMove);
        window.removeEventListener('mouseup', this.handleTrimEndMouseUp);
    }
    handleTrimStartMouseDown (e) {
        this.initialX = e.clientX;
        this.initialTrim = this.props.trimStart;
        window.addEventListener('mousemove', this.handleTrimStartMouseMove);
        window.addEventListener('mouseup', this.handleTrimStartMouseUp);
    }
    handleTrimEndMouseDown (e) {
        this.initialX = e.clientX;
        this.initialTrim = this.props.trimEnd;
        window.addEventListener('mousemove', this.handleTrimEndMouseMove);
        window.addEventListener('mouseup', this.handleTrimEndMouseUp);
    }
    render () {
        const {
            onPlay, // eslint-disable-line no-unused-vars
            onStopPlaying, // eslint-disable-line no-unused-vars
            ...componentProps
        } = this.props;
        return (
            <PlaybackStepComponent
                onPlay={this.handlePlay}
                onStopPlaying={this.handleStopPlaying}
                onTrimEndMouseDown={this.handleTrimEndMouseDown}
                onTrimStartMouseDown={this.handleTrimStartMouseDown}
                {...componentProps}
            />
        );
    }
}

PlaybackStep.propTypes = {
    samples: PropTypes.instanceOf(Float32Array).isRequired,
    ...PlaybackStepComponent.propTypes
};

module.exports = PlaybackStep;

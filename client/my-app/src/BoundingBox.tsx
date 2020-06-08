import {Button, Modal, Slider} from "antd";
import * as React from "react";
import 'react-image-crop/dist/ReactCrop.css';
import Cropper from "react-easy-crop";
import {SliderValue} from "antd/es/slider";
import {Area, Point} from "react-easy-crop/types";
import getCroppedImg from './cropImage';

interface BoundingBoxProps {
    visible: boolean;
    imageUrl: string;
    endpoint: string;
    handleCancel: () => void;
}

export class BoundingBox extends React.Component<BoundingBoxProps> {

    state = {
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 1 / 1,
        rotation: 0,
        croppedArea: 0
    }

    onCropChange = (crop : Point) => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea : Area, croppedAreaPixels : Area) => {
        this.setState({croppedArea: croppedArea});
    }

    onZoomChange = (zoom : number) => {
        this.setState({ zoom })
    }

    onRotationChange = (rotation : number) => {
        this.setState({ rotation })
    }

    handleOk = () => {
        const croppedImage = getCroppedImg(this.props.imageUrl, this.state.croppedArea, this.state.rotation);
    }

    render() { return(
        <Modal
            title="Bounding box"
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.props.handleCancel}
            footer={[
                <Button key="OK" onClick={this.handleOk}>
                        OK
                    </Button>,

                <Button key="back" onClick={this.props.handleCancel}>
                    Cancel
                </Button>,
            ]}
        >

            <div>
                <div className="crop-container" style={{width: "100%", position: "relative", height: 400}}>
                    <Cropper
                        image={this.props.imageUrl}
                        crop={this.state.crop}
                        zoom={this.state.zoom}
                        rotation={this.state.rotation}
                        aspect={this.state.aspect}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
                        onZoomChange={this.onZoomChange}
                        restrictPosition={false}
                    />
                </div>
                <div className="controls">
                    Zoom
                    <Slider
                        value={this.state.zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(zoom : SliderValue) => this.onZoomChange(Number(zoom))}
                    />

                    Rotation
                    <Slider
                        value={this.state.rotation}
                        min={0}
                        max={360}
                        step={1}
                        onChange={(rotation : SliderValue) => this.onRotationChange(Number(rotation))}
                    />
                </div>
            </div>

            </Modal>)
            }
}

import React, { Component } from 'react';
import {
  Content, UploadBoxWrapper, UploadBox, Label, UploadBoxIcon, ImageWrapper, Img, ImageDescription, ImageName,
  EditIconWrapper, ShowMoreResultsSpinner, TagIconWrapper, Overlay, SelectIconWrapper, EditButton
} from '../../styledComponents';
import VirtualizedImagesGrid from '../VirtualizedImagesGrid';
import * as ImageGridService from '../../services/imageGrid.service';
import { I18n } from 'react-i18nify';


class UploadedImagesContent extends Component {
  constructor() {
    super();

    this.state = {
      imageGridWrapperWidth: 0,
      imageContainerHeight: 0,
      imageGrid: { columnWidth: 0, gutterSize: 10, minColumnWidth: 200 }
    };
    this.imageGridWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.updateImageGridColumnWidth();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imageGridWrapperRef.current && this.getImageGridWrapperWidth() !== prevState.imageGridWrapperWidth)
      this.updateImageGridColumnWidth();
  }

  getImageGridWrapperWidth = () => Math.floor(this.imageGridWrapperRef.current.getBoundingClientRect().width);
  getImageGridWrapperHeight = () => this.imageGridWrapperRef.current.getBoundingClientRect().height;

  updateImageGridColumnWidth = () => {
    let { imageGrid } = this.state;
    const { minColumnWidth, gutterSize } = imageGrid;
    const imageGridWrapperWidth = this.getImageGridWrapperWidth();
    const imageContainerHeight = this.getImageGridWrapperHeight();

    imageGrid.columnWidth = ImageGridService.getActualColumnWidth(imageGridWrapperWidth, minColumnWidth, gutterSize);

    this.setState({ imageGridWrapperWidth, imageGrid, imageContainerHeight });
  };

  onKeyDown = (event, item) => {
    if (event !== 13) return;
    event.stopPropagation();
    this.upload(item);
  }

  upload = (item) => {
    const files = [{...item, public_link: item.url_permalink }];

    this.props.appState.config.uploadHandler(files);
    this.props.closeModal();
  }

  onTagImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.tagging.active) {
      const files = [{...item, public_link: item.url_permalink }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'TAGGING', 'MY_GALLERY');
    }
  }

  onEditImage = (event, item) => {
    event.preventDefault();
    event.stopPropagation();

    if (this.props.appState.config.imageEditor.active) {
      const { path } = this.props;
      const files = [{...item, public_link: item.url_permalink }];

      this.props.saveUploadedFiles(files);
      this.props.setPostUpload(true, 'IMAGE_EDITOR', 'MY_GALLERY', { path });
    }
  }

  render() {
    const { files, onDragEvent, isDragOver, isShowMoreImages, imagesIndex, isLoading } = this.props;
    const { imageGrid, imageContainerHeight, imageGridWrapperWidth } = this.state;
    const { columnWidth, gutterSize } = imageGrid;
    const imagesList = [{ id: 'uploaderBox' }, ...files];

    return (
      <Content
        innerRef={this.imageGridWrapperRef}
        onDragOver={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragEnter={(event) => { onDragEvent(event, 'isDragOver', true); }}
        onDragLeave={(event) => { onDragEvent(event, 'isDragOver', false); }}
        onDragEnd={(event) => { onDragEvent(event, 'isDragOver', false); }}
        isDragOver={isDragOver}
      >
        {files.length ?
          <VirtualizedImagesGrid
            key={imagesIndex}
            imageGridWrapperWidth={imageGridWrapperWidth}
            imageContainerHeight={imageContainerHeight}
            columnWidth={columnWidth}
            gutterSize={gutterSize}
            count={imagesList.length}
            list={imagesList}
            upload={this.upload}
            onShowMoreImages={this.props.onShowMoreImages}
            isShowMoreImages={isShowMoreImages}
            cellContent={(props) =>
              props.item.id !== 'uploaderBox' ? this.renderImage(props) : this.renderUploadBox(props)
            }
          /> : ''}

        {!files.length && !isLoading && this.renderUploadBox({})}

        <ShowMoreResultsSpinner show={isShowMoreImages && imagesList.length > 1}/>
      </Content>
    )
  }

  renderImage = ({ style, columnWidth, item, index }) => {
    const { tagging, imageEditor } = this.props.appState.config;
    const isTagImage = tagging.active;
    const isEditImage = imageEditor.active;

    return (
      <ImageWrapper
        style={{ ...style, width: Math.floor(columnWidth) }}
        role="button"
        tabIndex={index}
        onKeyDown={(event) => { this.onKeyDown(event, item); }}
      >
        <div style={{ overflow: 'hidden' }}>
          <Img
            src={ImageGridService.getFitResizeImageUrl(item.url_permalink, columnWidth, Math.floor(columnWidth / (item.ratio || 1.6)))}
            height={Math.floor(columnWidth / (item.ratio || 1.6))}
          />
        </div>
        <ImageDescription>
          <ImageName>{item.name}</ImageName>
        </ImageDescription>

        <Overlay>
          {isEditImage &&
          <EditIconWrapper onClick={(event) => { this.onEditImage(event, item); }}>
            <EditButton fullBr={'4px'}>{I18n.t('file_manager.edit_image')}</EditButton>
          </EditIconWrapper>}
          {isTagImage &&
          <TagIconWrapper onClick={(event) => { this.onTagImage(event, item); }}>
            <EditButton fullBr={'4px'}>{I18n.t('file_manager.tag_image')}</EditButton>
          </TagIconWrapper>}
          <SelectIconWrapper onClick={() => { this.upload(item); }}>
            <EditButton fullBr={'4px'} success={true}>{I18n.t('file_manager.select')}</EditButton>
          </SelectIconWrapper>
        </Overlay>
      </ImageWrapper>
    );
  }

  renderUploadBox = ({ style = {}, columnWidth = 300, item = {} }) => {
    const { fileDropHandler } = this.props;
    const { isDragOver } = this.state;

    return (
      <UploadBoxWrapper
        onDrop={fileDropHandler}
        method={'post'}
        encType="multipart/form-data"
        style={style}
        columnWidth={columnWidth}
        height={Math.floor((columnWidth / (item.ratio || 1.6)) + 24)}
      >
        <UploadBox isDragOver={isDragOver}>
          <UploadBoxIcon className={'sfi-airstore-image'}/>
          <Label center>{I18n.t('file_manager.drag_images_here')}</Label>
        </UploadBox>
      </UploadBoxWrapper>
    )
  }
}

export default UploadedImagesContent;
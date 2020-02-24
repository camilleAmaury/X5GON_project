import React, { Fragment } from 'react';
import Popover from '../../../Popover/Popover';

export default function DocumentContainer(item, i, styles, scrollEv, leftsideScroll, rightsideScroll, fullPagoda, isOpen, hoverValButton, hoverDelButton,
    clickDelete, clickValidate, ratingHover, ratingClick, sendRating, hoverTitle) {

    let lantern = [1, 2, 3, 4, 5];
    return (
        <div className={"document-container"} data-id={item.id} style={
            {
                height: styles.container.document.height[i],
                width: styles.container.document.width,
                left: styles.container.document.left[i]
            }
        }>
            {/* center scroll */}
            <div className={"scroll-center"} style={
                {
                    height: styles.center.height[i],
                    width: styles.center.width,
                    top: styles.center.top,
                    left: styles.center.left
                }
            }>
                {/* text */}
                <div className={"lectures-corpus"} data-key={i} onScroll={item.isScrolled ? scrollEv : () => { }} style={
                    {
                        height: styles.corpus.height[i],
                        width: styles.corpus.width
                    }
                }>
                    <div className={"span"} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
                {/* sides */}
                <div className={"side1"} style={
                    {
                        height: styles.side.height[i],
                        width: styles.side.width,
                    }
                }></div>
                <div className={"side2"} style={
                    {
                        height: styles.side.height[i],
                        width: styles.side.width,
                        left: styles.side.left
                    }
                }></div>
            </div>

            {/* top scroll */}
            <div className={"scrollUpper"} data-key={i} onMouseEnter={() => hoverTitle(i, true)} onMouseLeave={() => hoverTitle(i, false)} style={
                {
                    height: styles.upper.height,
                    width: styles.upper.width,
                    top: styles.upper.top1,
                    left: styles.upper.left,
                }
            }>
                <div className={"scrollTexture"} style={
                    {
                        height: styles.texture.height,
                        width: styles.texture.width,
                        left: styles.texture.left,
                        top: styles.texture.top,
                        backgroundPositionY: styles.texture.backgroundPositionY1[i]
                    }
                }>
                    <span>{item.title}</span>
                </div>
            </div>

            <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
                {
                    height: styles.scrollSide.height,
                    width: styles.scrollSide.width,
                    top: styles.scrollSideTop,
                    left: styles.scrollSide.left1,
                }
            }></img>
            <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
                {
                    height: styles.scrollSide.height,
                    width: styles.scrollSide.width,
                    top: styles.scrollSideTop,
                    left: styles.scrollSide.left2,
                }
            }></img>
            {/* bottom scroll */}
            <div className={"scrollUpper"} data-key={i} onMouseEnter={() => hoverTitle(i, true)} onMouseLeave={() => hoverTitle(i, false)} style={
                {
                    height: styles.upper.height,
                    width: styles.upper.width,
                    top: styles.upper.top2[i],
                    left: styles.upper.left,
                }
            }>
                <div className={"scrollTexture2"} style={
                    {
                        height: styles.texture.height,
                        width: styles.texture.width,
                        left: styles.texture.left,
                        top: styles.texture.top,
                        backgroundPositionY: styles.texture.backgroundPositionY2[i]
                    }
                }>
                </div>
            </div>
            <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
                {
                    height: styles.scrollSide.height,
                    width: styles.scrollSide.width,
                    top: styles.scrollSideBottom[i],
                    left: styles.scrollSide.left1
                }
            }></img>
            <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
                {
                    height: styles.scrollSide.height,
                    width: styles.scrollSide.width,
                    top: styles.scrollSideBottom[i],
                    left: styles.scrollSide.left2
                }
            }></img>

            <Popover id={"title-hover-" + i} zIndex={15} pointerEvents={false}
                target={{ height: styles.upper.height, width: styles.upper.width, top: styles.upper.top2[i], left: styles.upper.left }}
                ratio={1 / 2} side={"top"} size={{ width: 450, height: 100 }}
                isOpen={item.isTitleHover && isOpen} title={"Click to scroll"}>
                <div className={"title-hover"}>
                    <span>{item.title}</span>
                </div>
            </Popover>
            {/* Changing button */}
            <div className={"changeButton"} data-key={i} style={
                {
                    left: styles.button.left,
                    top: styles.button.top[i],
                    width: styles.button.width,
                    height: styles.button.height,
                }
            }>
                <img className={"img"} alt={"pagoda-button"} src={fullPagoda} style={
                    {
                        left: styles.image[i].left,
                        top: styles.image[i].top,
                        width: styles.image[i].width,
                        height: styles.image[i].height,
                    }
                }></img>
                <div className={"shadow"} style={
                    {
                        backgroundColor: item.isScrolled ? "rgba(0,0,0,0)" : "rgba(0,0,0,0.3)"
                    }
                }></div>
            </div>

            {!item.isRated ?
                <Fragment>
                    <div className={"validateButton"} data-key={i} onClick={() => { clickValidate(i) }} onMouseEnter={() => { hoverValButton(i, true) }}
                        onMouseLeave={() => { hoverValButton(i, false) }} style={
                            {
                                left: styles.valdelButton.left,
                                top: styles.valdelButton.top1[i],
                                width: styles.valdelButton.width,
                                height: styles.valdelButton.height,
                            }
                        }></div>
                    <Popover color={"#334458"} id={"validate-hover-" + i}
                        target={{ left: styles.valdelButton.left, top: styles.valdelButton.top1[i], width: styles.valdelButton.width, height: styles.valdelButton.height }}
                        ratio={1 / 2} side={"right"} size={{ width: 350, height: 100 }}
                        isOpen={item.isValidateHovered && !item.isValidateClicked && isOpen} title={"Validate Document"}>
                        <div className={"button-hover"}>
                            <span>{!item.isScrolled ? 'Scroll to see more ...' : 'Have you finish to read ? just click !'}</span>
                        </div>
                    </Popover>
                    <Popover color={"#334458"} id={"validate-hover-" + i}
                        target={{ left: styles.valdelButton.left, top: styles.valdelButton.top1[i], width: styles.valdelButton.width, height: styles.valdelButton.height }}
                        ratio={1 / 2} side={"right"} size={{ width: 350, height: 350 }}
                        isOpen={item.isValidateClicked && isOpen} title={"Validate Document"}>
                        <div className={"button-hover"}>
                            <div className={"title"}>Rate your understanding</div>
                            <div className={"rateUnderstading"}>
                                {lantern.map((num, k) =>
                                    <div className={item.ratingUnderstandingHover >= num ? "lanternHover" : item.ratingUnderstanding >= num ? "lanternSelect" : "lantern"}
                                        onMouseEnter={() => { ratingHover(0, i, num) }} onMouseLeave={() => { ratingHover(0, i, 0) }} key={k}
                                        onClick={() => { ratingClick(0, i, num) }}></div>
                                )}
                            </div>
                            <div className={"title"}>Rate the quality</div>
                            <div className={"rateQuality"}>
                                {lantern.map((num, k) =>
                                    <div className={item.ratingQualityHover >= num ? "lanternHover" : item.ratingQuality >= num ? "lanternSelect" : "lantern"}
                                        onMouseEnter={() => { ratingHover(1, i, num) }} onMouseLeave={() => { ratingHover(1, i, 0) }} key={k}
                                        onClick={() => { ratingClick(1, i, num) }}></div>
                                )}
                            </div>
                            <div className={"submit"} onClick={() => { sendRating(i) }}><span>submit</span></div>
                        </div>
                    </Popover>
                </Fragment>
                : ""}

            <div className={"deleteButton"} data-key={i} onClick={() => { clickDelete(i) }} onMouseEnter={() => { hoverDelButton(i, true) }}
                onMouseLeave={() => { hoverDelButton(i, false) }} style={
                    {
                        left: styles.valdelButton.left,
                        top: styles.valdelButton.top2[i],
                        width: styles.valdelButton.width,
                        height: styles.valdelButton.height,
                    }
                }></div>
            <Popover color={"#d34949"} id={"delete-hover-" + i}
                target={{ left: styles.valdelButton.left, top: styles.valdelButton.top2[i], width: styles.valdelButton.width, height: styles.valdelButton.height }}
                ratio={1 / 2} side={"right"} size={{ width: 350, height: 100 }}
                isOpen={item.isDeleteHovered && isOpen} title={"Delete Document"}>
                <div className={"button-hover"}>
                    <span>{!item.isScrolled ? 'Scroll to see more ...' : 'You don\'t want to keep the document in your list ? Just click !'}</span>
                </div>
            </Popover>
            <Popover color={"#d34949"} id={"delete-hover2-" + i}
                target={{ left: styles.valdelButton.left, top: styles.valdelButton.top2[i], width: styles.valdelButton.width, height: styles.valdelButton.height }}
                ratio={1 / 2} side={"right"} size={{ width: 350, height: 100 }}
                isOpen={item.isDeleteClicked === 1 && isOpen} title={"Delete Document Confirmation"}>
                <div className={"button-hover"}>
                    <span>Do you really want to delete it ? Just click !</span>
                </div>
            </Popover>
        </div>
    );
}
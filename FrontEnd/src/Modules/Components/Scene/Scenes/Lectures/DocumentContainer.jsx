import React from 'react';
export default function DocumentContainer(item, i, styles, scrollEv, leftsideScroll, rightsideScroll, fullPagoda) {
  return(
    <div className={"document-container"}data-id={item.id} style={
        {
            height:styles.container.document.height[i],
            width:styles.container.document.width,
            left:styles.container.document.left[i]
        }
    }>
        {/* center scroll */}
        <div className={"scroll-center"} style={
            {
                height:styles.center.height[i],
                width:styles.center.width,
                top:styles.center.top,
                left:styles.center.left
            }
        }>
            {/* text */}
            <div className={"lectures-corpus"} data-key={i} onScroll={item.isScrolled ? scrollEv : () => {}} style={
                {
                    height:styles.corpus.height[i],
                    width:styles.corpus.width
                }
            }>
                <div className={"span"}>{item.content}</div>
            </div>
            {/* sides */}
            <div className={"side1"} style={
                {
                    height:styles.side.height[i],
                    width:styles.side.width,
                }
            }></div>
            <div className={"side2"} style={
                {
                    height:styles.side.height[i],
                    width:styles.side.width,
                    left:styles.side.left
                }
            }></div>
        </div>
    
        {/* top scroll */}
        <div className={"scrollUpper"} data-key={i} style={
            {
                height:styles.upper.height,
                width:styles.upper.width,
                top:styles.upper.top1,
                left:styles.upper.left,
            }
        }>
            <div className={"scrollTexture"} style={
                {
                    height:styles.texture.height,
                    width:styles.texture.width,
                    left:styles.texture.left,
                    top:styles.texture.top,
                    backgroundPositionY:styles.texture.backgroundPositionY1[i]
                }
            }>
                <span>{item.title}</span>
            </div>
        </div>
        <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
            {
                height:styles.scrollSide.height,
                width:styles.scrollSide.width,
                top:styles.scrollSideTop,
                left:styles.scrollSide.left1,
            }
        }></img>
        <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
            {
                height:styles.scrollSide.height,
                width:styles.scrollSide.width,
                top:styles.scrollSideTop,
                left:styles.scrollSide.left2,
            }
        }></img>
        {/* bottom scroll */}
        <div className={"scrollUpper"} data-key={i} style={
            {
                height:styles.upper.height,
                width:styles.upper.width,
                top:styles.upper.top2[i],
                left:styles.upper.left,
            }
        }>
            <div className={"scrollTexture2"} style={
                {
                    height:styles.texture.height,
                    width:styles.texture.width,
                    left:styles.texture.left,
                    top:styles.texture.top,
                    backgroundPositionY:styles.texture.backgroundPositionY2[i]
                }
            }>
            </div>
        </div>
        <img className={"scrollSide"} src={leftsideScroll} alt={"side-scroll"} style={
            {
                height:styles.scrollSide.height,
                width:styles.scrollSide.width,
                top:styles.scrollSideBottom[i],
                left:styles.scrollSide.left1
            }
        }></img>
        <img className={"scrollSide"} src={rightsideScroll} alt={"side-scroll"} style={
            {
                height:styles.scrollSide.height,
                width:styles.scrollSide.width,
                top:styles.scrollSideBottom[i],
                left:styles.scrollSide.left2
            }
        }></img>
        
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
    </div>
  );
}
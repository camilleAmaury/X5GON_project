import React, { Fragment } from 'react';
import Popover from '../../../Popover/Popover';

export default function PagodaContainer(item, i, styles, hoverPagoda, unhoverPagoda, clickPagoda, state, PagodaFloor, encens, table, reverseScroll, isOpen) {
  return(
    <div className={"pagoda-container"} data-id={item.id} style={
        {
            height: styles.container.pagoda.height[i],
            width: styles.container.pagoda.width,
            left: styles.container.pagoda.left[i]
        }
    }>
        {/* beam */}
        <div className={"verticalBeam"} style={
            {
                left: styles.beamVertical.left1[i],
                width: styles.beamVertical.width,
                height: styles.beamVertical.height[i],
            }
        }></div>
        <div className={"verticalBeam"} style={
            {
                left: styles.beamVertical.left2[i],
                width: styles.beamVertical.width,
                height: styles.beamVertical.height[i],
            }
        }></div>
        <div className={"horizontalBeam"} style={
            {
                left: styles.beamHorizontal.left1[i],
                width: styles.beamHorizontal.width1[i],
                height: styles.beamHorizontal.height,
                top: styles.beamHorizontal.top1[i],
            }
        }></div>
        <div className={"horizontalBeam"} style={
            {
                left: styles.beamHorizontal.left3[i],
                width: styles.beamHorizontal.width1[i],
                height: styles.beamHorizontal.height,
                top: styles.beamHorizontal.top1[i],
            }
        }></div>
        <div className={"horizontalBeam"} style={
            {
                left: styles.beamHorizontal.left2[i],
                width: styles.beamHorizontal.width2[i],
                height: styles.beamHorizontal.height,
                top: styles.beamHorizontal.top2[i],
            }
        }></div>

        {/* details */}
        <img className={"table"} alt={"table-pagoda"} src={table} style={
            {
                left: styles.table.left,
                width: styles.table.width,
                height: styles.table.height,
                top: styles.table.top[i],
            }
        }></img>

        <img className={"encens"} alt={"encens-pagoda"} src={encens} style={
            {
                left: styles.encens.left,
                width: styles.encens.width,
                height: styles.encens.height,
                top: styles.encens.top[i],
            }
        }></img>

        {/* Changing button */}
        <div className={"changeButton-two"} data-key={i} style={
            {
                top: styles.button2.top[i],
                width: styles.button2.width,
                height: styles.button2.height,
            }
        }>
            <img className={"img"} alt={"scroll-button"} src={reverseScroll} style={
                {
                    left: styles.image2[i].left,
                    top: styles.image2[i].top,
                    width: styles.image2[i].width,
                    height: styles.image2[i].height,
                }
            }></img>
        </div>

        {/* pagoda */}
        {state.documents[i].data.map((item, j) =>
            <Fragment key={j}>
                <img className={"pagoda"} alt={"pagoda-floor"}
                    src={state.isFloorHovered[i][j] ? state.floorTexture[j].hover : state.floorTexture[j].base}
                    onMouseEnter={() => { hoverPagoda(i, j) }} onMouseLeave={() => { unhoverPagoda(i, j) }} 
                    onClick={() => { clickPagoda(i, j) }} style={
                        {
                            top: styles.pagodaDocument[i].top[j],
                            height: styles.pagodaDocument[i].height[j],
                            width: styles.pagodaDocument[i].width[j],
                            left: styles.pagodaDocument[i].left[j],
                        }
                }></img>
                <Popover color={"#d34949"} id={"pagoda-hover"+(i*4+ j)}
                    target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                    ratio={1 / 2} side={"left"} size={{ width: 250, height: 100 }}
                    isOpen={state.isFloorHovered[i][j] && !state.isFloorClicked[i][j] && isOpen} title={"Pagoda"}>
                    <div className={"pagoda-hover"}>
                        <span>Click here to see more !</span>
                    </div>
                </Popover>
                <Popover id={"pagoda-popover" + (i*8+ j*2)} color={"#d34949"}
                    target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                    ratio={1 / 2} side={"left"} size={{ width: 400, height: 125 }}
                    isOpen={state.isFloorClicked[i][j] && isOpen} title={item[0].title}>
                    <div className={"pagoda-popover-click"}>
                        <div className={"item"} key={i} data-key={item.id}>
                            <div className={"item-number"}><span>{i}</span></div>
                            <div className={"item-info"}>
                                <div className={"title"}><a href={item[0].link} target="_blank" rel="noopener noreferrer">{item[0].link}</a></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </Popover>
                <Popover id={"pagoda-popover" + (i*8+ j*2 + 1)} color={"#d34949"}
                    target={{top: styles.pagodaDocument[i].top[j],height: styles.pagodaDocument[i].height[j],width: styles.pagodaDocument[i].width[j],left: styles.pagodaDocument[i].left[j]}} 
                    ratio={1 / 2} side={"right"} size={{ width: 400, height: 125 }}
                    isOpen={state.isFloorClicked[i][j] && isOpen} title={item[1].title}>
                    <div className={"pagoda-popover-click"}>
                        <div className={"item"} key={i} data-key={item.id}>
                            <div className={"item-number"}><div>{i}</div></div>
                            <div className={"item-info"}>
                                <div className={"title"}><a href={item[1].link} target="_blank" rel="noopener noreferrer">{item[1].link}</a></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </Fragment>
        )}
        
        
        <img className={"floor"} alt={"floor-pagoda"} src={PagodaFloor} style={
            {
                left: styles.pagodafloor.left,
                width: styles.pagodafloor.width,
                height: styles.pagodafloor.height,
                top: styles.pagodafloor.top[i],
            }
        }></img>

    </div>
  );
}
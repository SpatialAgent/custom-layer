import Layer from "@arcgis/core/layers/Layer";
import BaseLayerView2D from "@arcgis/core/views/2d/layers/BaseLayerView2D";

export default class CustomLayer extends Layer {
    color: string = "#ff0000";

    constructor(props: any) {
        super(props);
        this.color = props.color || "#ff0000";
    }

    createLayerView(view: any, options?: __esri.LayerCreateLayerViewOptions): Promise<__esri.LayerView> {
        if (view.type === "2d") {
            return Promise.resolve(new CustomLayerView2D({ view: view, layer: this }));
        } else {
            return Promise.reject();
        }
    }

}

class CustomLayerView2D extends BaseLayerView2D {

    constructor(props: any) {
        super(props);
        console.log(this);
    }

    render(renderParameters: __esri.BaseLayerView2DRenderRenderParameters): void {
        const lyr = this.layer as any;
        const vs = renderParameters.state as __esri.ViewState;
        let xy: Array<number> = [0, 0];
        vs.toScreen(xy, 0, 0);
        const ctx = renderParameters.context;
        ctx.beginPath();
        ctx.fillStyle = lyr.color;
        ctx.fillRect(xy[0] - 100, xy[1] - 100, 200, 200);
        ctx.closePath();
    }
}


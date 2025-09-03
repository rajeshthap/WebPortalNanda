import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class SectorBarcharOne extends Component {
	constructor() {
		super();
		this.addSymbols = this.addSymbols.bind(this);
	}
	
	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
		
		if(order > suffixes.length - 1)
			order = suffixes.length - 1;
 
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;	
	}
	
	render() {	
		const options = {
			animationEnabled: true,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			title: {
				text: ""
			},
			axisY: {
				title: "",
				labelFormatter: this.addSymbols,
				scaleBreaks: {
				autoCalculate: true
			}
			},
			axisX: {
				title: "",
				labelAngle: 0
			},
			data: [{
				type: "column",
				dataPoints: [
					{ label: "Step 1", y: 44206498},
					{ label: "Step 2", y: 42206475},
					{ label: "Step 3", y: 33206460},
					{ label: "Step 4", y: 30206451},
					{ label: "Final", y: 22206432},
					{ label: "Recommended to Accept", y: 20897709},
					{ label: "Recommended to Cancel", y: 7570438},
					{ label: "Feedback Pending", y: 7570438},
				]
			}]
		}
						
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	} 			
}
 
export default SectorBarcharOne;   
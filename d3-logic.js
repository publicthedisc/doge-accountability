function fillDogeSavingsInfo(data){
    const totalSavings = data.reduce((sum, item) => sum + item.doge_savings, 0);
    document.getElementById("actual-doge-savings-container").innerText = `$${formatNumber(totalSavings.toFixed(2))}`;
}

function drawWomenOwnedChart(data){
    const filteredData = data.filter(d => d.isWomenOwned != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.isWomenOwned),
        ([key, value]) => ({ isWomenOwned: key, count: value })
        );

    const container = d3.select("#women-owned-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(counts.map(d => d.isWomenOwned))
        .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('path')
        .data(pie(counts))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.isWomenOwned))
        .style("stroke", "white")
        .style("stroke-width", "2px")
        
    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => `${d.data.isWomenOwned == "true" ? "Women Owned" : "Not Women Owned"}: ${d.data.count}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12);
}
function drawVeteranOwnedChart(data){
    const filteredData = data.filter(d => d.isVeteranOwned != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.isVeteranOwned),
        ([key, value]) => ({ isVeteranOwned: key, count: value })
        );

    const container = d3.select("#veteran-owned-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
    .domain(counts.map(d => d.isVeteranOwned))
    .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('path')
    .data(pie(counts))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.isVeteranOwned))
    .style("stroke", "white")
    .style("stroke-width", "2px");

    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => `${d.data.isVeteranOwned == "true" ? "Veteran Owned" : "Not Veteran Owned"}: ${d.data.count}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12);
}
function drawBusinessSizeChart(data){
    const filteredData = data.filter(d => d.business_size != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.business_size),
        ([key, value]) => ({ business_size: key, count: value })
        );

    const container = d3.select("#business-size-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
    .domain(counts.map(d => d.business_size))
    .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg.selectAll('path')
    .data(pie(counts))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.business_size))
    .style("stroke", "white")
    .style("stroke-width", "2px");

    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => `${d.data.business_size == "SMALL BUSINESS" ? "Small Business" : "Not Small Business"}: ${d.data.count}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12);
}
function drawBusinessTypeChart(data){
    const filteredData = data.filter(d => d.business_type != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.business_type),
        ([key, value]) => ({ business_type: key, count: value })
        );

    const container = d3.select("#business-type-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
    .domain(counts.map(d => d.business_type))
    .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
    .data(pie(counts))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.business_type))
    .style("stroke", "white")
    .style("stroke-width", "2px")
    .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
                .text(`${toTitleCase(d.data.business_type)}: ${d.data.count}`);
    })
    .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
    });

    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.3 ? `${toTitleCase(d.data.business_type)}: ${d.data.count}` : "";
    })
    .attr("transform", d => {
        const [x, y] = arc.centroid(d);
        const offset = 1.4;            
        return `translate(${x * offset}, ${y * offset})`;
    })
    .style("text-anchor", "middle")
    .style("font-size", 12);
}
function drawContractPricingChart(data){
    const filteredData = data.filter(d => d.contract_pricing != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.contract_pricing),
        ([key, value]) => ({ contract_pricing: key, count: value })
        );

    const container = d3.select("#contract-pricing-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(counts.map(d => d.contract_pricing))
        .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(pie(counts))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.contract_pricing))
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            tooltip.style("visibility", "visible")
                    .text(`${toTitleCase(d.data.contract_pricing)}: ${d.data.count}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        });
        
    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.3 ? `${toTitleCase(d.data.contract_pricing)}: ${d.data.count}` : "";
    })
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12)
}
function drawContractValueChart(data){
    const filteredData = data.filter(d => d.value != null);

    const maxVal = d3.max(filteredData, d => d.value);
    const values = filteredData.map(d => d.value);

    const thresholds = generateExponentialThresholds(1000, maxVal * 1000, 10);

    const bins = d3.histogram()
        .domain([0, d3.max(thresholds)])
        .thresholds(thresholds)(values);

    const binnedData = bins.map(bin => ({
        range: `${formatNumber(bin.x0)}-${formatNumber(bin.x1)}`,
        count: bin.length
    })).filter(d => d.count > 0);

    const container = d3.select("#contract-value-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(binnedData.map(d => d.range))
        .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(pie(binnedData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.range))
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            tooltip.style("visibility", "visible")
                .text(`${d.data.range}: ${d.data.count}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        });
        
    svg.selectAll("text")
    .data(pie(binnedData))
    .enter()
    .append("text")
    .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.3 ? `${d.data.range}: ${d.data.count}` : "";
    })
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12)
}
function drawOffersReceivedChart(data){
    const filteredData = data.filter(d => d.offers_recieved != null);

    const maxVal = d3.max(filteredData, d => d.offers_recieved);
    const values = filteredData.map(d => d.offers_recieved);

    const thresholds = [1, 2, 5, 10, 50, 100000000];

    const bins = d3.histogram()
        .domain([0, d3.max(thresholds)])
        .thresholds(thresholds)(values);

    const binnedData = bins.map(bin => ({
        range: (bin.x1 - bin.x0 == 1) ? (bin.x1 < 100000) ? formatNumber(bin.x0) : `${bin.x0}+` : (bin.x1 < 100000) ? `${formatNumber(bin.x0)}-${ formatNumber(bin.x1)}` : `${bin.x0}+`,
        count: bin.length
    })).filter(d => d.count > 0);

    const container = d3.select("#offers-received-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(binnedData.map(d => d.range))
        .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip = d3.select("#tooltip");

    svg.selectAll('path')
        .data(pie(binnedData))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.range))
        .style("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d) => {
            tooltip.style("visibility", "visible")
                .text(`${d.data.range}: ${d.data.count}`);
        })
        .on("mousemove", (event) => {
            tooltip.style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("visibility", "hidden");
        });
        
    svg.selectAll("text")
    .data(pie(binnedData))
    .enter()
    .append("text")
    .text(d => {
        const angle = d.endAngle - d.startAngle;
        return angle > 0.3 ? `${d.data.range}: ${d.data.count}` : "";
    })
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12)
}
function drawContractTypeChart(data){
    const filteredData = data.filter(d => d.contract_type != null);

    const counts = Array.from(
        d3.rollup(filteredData, v => v.length, d => d.contract_type),
        ([key, value]) => ({ contract_type: key, count: value })
        );

    const container = d3.select("#contract-type-pie-chart");
    const containerNode = container.node(); 
    const width = containerNode.clientWidth;  
    const height = containerNode.clientHeight;
    const radius = Math.min(width, height) / 2;

    const svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
    .domain(counts.map(d => d.contract_type))
    .range(["#CCCCFF", "#E3E4FA","#A2A2D0","#7B68EE","#6A5ACD","#8A2BE2","#324AB2", "#6F00FF","#665FD1", "#5A4FCF"]);

    const pie = d3.pie().value(d => d.count);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const tooltip =  d3.select("#tooltip");

    svg.selectAll('path')
    .data(pie(counts))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data.contract_type))
    .style("stroke", "white")
    .style("stroke-width", "2px")
    .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
            .html(d.data.contract_type == "IDV"
                ? `<strong>IDV (Infinite Delivery Vehicle)</strong><br>
                A type of contract used to establish pre-negotiated terms for future task or delivery orders when the exact timing or quantity of goods or services is not yet known.<br>
                    IDVs provide a flexible structure for agencies to make purchases over time without issuing a new contract for each need.` 
                : `<strong>Award</strong><br>
                The finalized selection and issuance of a contract to a vendor, signaling the start of an official contractual relationship.<br>
                    An award can be made for a standalone contract or as part of a broader contract type like an IDV.`);
    })
    .on("mousemove", (event) => {
        tooltip.style("top", (event.pageY + 10) + "px")
                .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
    });

    svg.selectAll("text")
    .data(pie(counts))
    .enter()
    .append("text")
    .text(d => `${d.data.contract_type == "IDV" ? "IDV" : "Award"}: ${d.data.count}`)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .style("text-anchor", "middle")
    .style("font-size", 12);
}

function generateExponentialThresholds(start, end, base = 10) {
    const thresholds = [];
    let current = start;

    while (current < end) {
        thresholds.push(current);
        current *= base;
    }

    thresholds.push(end);
    return thresholds;
}

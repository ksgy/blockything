/*jslint browser: true*/
/*global  */

const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;

class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
        this.checked = false;
    }
}

class BlockGrid {

    constructor () {
        this.neighbours = [];
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                blockEl.addEventListener('click', (evt) => this.blockClicked(evt, block));
                colEl.appendChild(blockEl);
            }
        }

        return this;
    }

    blockClicked (e, block) {
        console.log(e, block);

        this.neighbours = [];

        if(block.x > 0 && block.y > 0 && block.x < MAX_X-1 && block.y < MAX_Y-1) {
            let topBlock = this.grid[block.x][block.y+1];
            let rightBlock = this.grid[block.x+1][block.y];
            let bottomBlock = this.grid[block.x][block.y-1];
            let leftBlock = this.grid[block.x-1][block.y];

            let blockNeighbours = [topBlock, rightBlock, bottomBlock, leftBlock];

            this.getNeighBour(block, blockNeighbours);
        }


    }

    getNeighBour (block, blockNeighbours) {

        block.checked = true;
        // block.colour = 'grey';

        for (let i = blockNeighbours.length - 1; i >= 0; i--) {
            console.log(block.colour, 'blockNeighbours[i]', blockNeighbours[i]);

            if(block.colour == blockNeighbours[i].colour){
                console.log('blockelem', blockNeighbours[i]);
                this.neighbours.push(blockNeighbours[i]);
                if(block.checked == false) {
                    this.getNeighBour(blockNeighbours[i], blockNeighbours);
                }
            }
        };
    }
}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());

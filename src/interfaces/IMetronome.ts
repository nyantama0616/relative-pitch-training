export default interface IMetronome {
    beat(velocity: number): void //0 ~ 127のvelocityを指定し、メトローム音を鳴らす
}

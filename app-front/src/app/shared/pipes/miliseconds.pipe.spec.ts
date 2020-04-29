import { MilisecondsPipe } from './miliseconds.pipe';

describe('MilisecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new MilisecondsPipe();
    expect(pipe).toBeTruthy();
  });
});

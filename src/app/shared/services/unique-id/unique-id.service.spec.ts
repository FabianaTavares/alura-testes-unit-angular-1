import { TestBed } from '@angular/core/testing';

import { UniqueIdService } from './unique-id.service';

describe(UniqueIdService.name, () => {
  let service: UniqueIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueIdService);
    service = new UniqueIdService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Essa é a maneira mais elegante de declarar o nome do método que está testando, se fosse um metodo privado deveria ser escrito da seguinte forma: #${UniqueIdService.prototype.['generateUniqueIdWithPrefix'].name}
   */
  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
    const id = service.generateUniqueIdWithPrefix('app');
    expect(id.startsWith('app-')).toBeTrue();
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should not generate duplicate Ids when called multiple times`, () => {
    /* const firstId = service.generateUniqueIdWithPrefix('app');
    const secondId = service.generateUniqueIdWithPrefix('app');
    expect(firstId).not.toBe(secondId); */
    const ids = new Set();
    for (let i = 0; i < 50; i++) {
      ids.add(service.generateUniqueIdWithPrefix('app'));
    }
    expect(ids.size).toBe(50);
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name} should return the number of generateIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should throw when called with empty`, () => {
    /*
     pra lançar uma excessão precisa criar uma função (aerofunction), precisa testar os tres tipos de exceção
    expect(() => service.generateUniqueIdWithPrefix(null)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix(undefined)).toThrow();
    expect(() => service.generateUniqueIdWithPrefix('')).toThrow();
    */
    //Escrevendo o mesmo codigo acima de maneira mais organizada

    const emptyValues = [null, undefined, '', '0', '1'];
    emptyValues.forEach(emptyValue => {
      expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Empty value: ${emptyValue}`)
        .toThrow();
    })

  });

});

//@ts-ignore
import tableMounter from '../../../Controllers/Tables/tablemounter';

describe('tableMounter', () => {
  it('should return correct columns from data and remove columns with id', () => {
    const data = [
        { id: 1, name: 'John', email_id: 'john@example.com' },
        { id: 2, name: 'Jane', email_id: 'jane@example.com' }
      ];
      const deleteFunction = jest.fn();
    
      const result = tableMounter(data, deleteFunction);
    
      expect(result.columns).toEqual(expect.arrayContaining([
        expect.objectContaining({ Header: 'Name', accessor: 'name' }),
        expect.objectContaining({ Header: 'Ações', accessor: 'id' })
      ]));
      expect(result.data).toEqual(data);
  });

  it('should return empty object when no data is provided', () => {
    const deleteFunction = jest.fn();

    const result = tableMounter(null, deleteFunction);

    expect(result).toEqual({ columns: [], data: [] });
  });
});
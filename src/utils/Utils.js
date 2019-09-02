export default class Utils {

  static filterArrayByString(mainArr, searchKey, searchText)
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        searchText = searchText.toLowerCase();
        //  return filtered array.
        return mainArr.filter(itemObj => {
            return this.searchInObj(itemObj[searchKey], searchText);
        });
    };

    static searchInObj(objValue, searchText)
    {
      if (this.searchInString(objValue, searchText))
      {
          return true;
      }

    }

    static searchInString(value, searchText)
    {
        return value.toLowerCase().includes(searchText);
    }
}
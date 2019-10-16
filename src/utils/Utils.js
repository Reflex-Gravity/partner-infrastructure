export default class Utils {

    /**
     * @description Returns filtered array based on searched string. If there's no match then returns original array.
     *
     * @static
     * @param {Array} mainArr
     * @param {String} searchKey
     * @param {String} searchText
     * @returns
     * @memberof Utils
     */
    static filterArrayByString(mainArr, searchKey, searchText)
    {
        if ( searchText === '' )
        {
            return mainArr;
        }

        searchText = searchText.toLowerCase();
        //  return filtered array.
        return [...mainArr].filter(itemObj => {
            // Search for text by search key
            if( this.searchInString(itemObj[searchKey], searchText) ){
                return true;
            }
        });
    };

    /**
     * @description Checks if searched text is in the string.
     *
     * @static
     * @param {String} value
     * @param {String} searchText
     * @returns
     * @memberof Utils
     */
    static searchInString(value, searchText)
    {
        return value.toLowerCase().includes(searchText);
    }
}
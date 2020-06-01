import React,{Component} from 'react'


class CustomTable extends Component{
    constructor(){
        super();
        this.state={
            items:[],
            resultItems:[],
            totalItems: 0,
            currentPage: 0,
            pageSize: 0,
            totalPages: 0,
            startIndex: 0,
            endIndex: 0
        }
    }

    componentDidMount(){
        const {data} = this.props;
        let rowsPerPage = Number(this.props.rowsPerPage) || 5;
        let pageObj = this.getPager(data.length,1,rowsPerPage);
        this.setState({
            ...pageObj,
            resultItems:[...data]
        },()=>{
            this.setPage();
        })
        // console.log(`rowsPerPage - ${rowsPerPage}\n,${JSON.stringify(this.getPager(this.props.data.length,2,rowsPerPage))}`);
    }

    changeHandler = (e,key) =>{
        
        let searchText = e.target.value.toLowerCase();
        if(searchText){
            let resultItems = this.props.data.filter((r)=>r[key].toString().toLowerCase().includes(searchText))
            this.setState((prevState)=>{
                return {
                    ...prevState,
                    resultItems
                }
            },()=>this.setPage());
        }else{
            this.setState((prevState,props)=>{
                return {
                    ...prevState,
                    resultItems:props.data
                }
            },()=>this.setPage());
        }
        
    }

    getPager=(totalItems, currentPage, pageSize)=> {
        // default to first page
        currentPage = currentPage || 1;


        //  total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startIndex: startIndex,
            endIndex: endIndex,
        };
    }

    setPage=(page)=>{
        if (page < 1 || page > this.state.totalPages) {
            return;
        }

        // get pager object 
        let pageObj = this.getPager(this.state.resultItems.length,page,this.state.pageSize);

         // current items to display
        let items = this.state.resultItems.slice(pageObj.startIndex,pageObj.endIndex);

        this.setState((prevState)=>{
            return {
                ...prevState,
                ...pageObj,
                items,
            }
        // },()=>console.log(this.state));
        });
    }

    render(){
        const {data} = this.props;
        

        const tableHeaders = data && data.length ? Object.keys(data[0]):[]
        return(
            <div className="tableContainer container">
                {data && data.length ?
                <>
                    <table className="table table-hover">
                        <thead>
                            <tr className="row">
                                
                                {tableHeaders.map((k,i)=>{
                                    return(
                                        <th className="col-6 dropdown" key={`header-${i}`}>
                                            <span className="dropdown-toggle" data-toggle="dropdown">
                                            {k}
                                            </span>
                                            <div className="dropdown-menu">
                                            <form className="mx-2 form-inline">
                                                <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search" onChange={(e)=>this.changeHandler(e,k)} />
                                                </div>    
                                            </form>
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items && this.state.items.map((obj,j)=>{
                                return (<tr className="row" key={`row-${j}`}>
                                    {tableHeaders.map((k,i)=><td className="col-6" key={`d-${j}-${i}`} onClick={()=>this.props.onRowClick(obj)}>{obj[k]}</td>)}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <ul className="pagination justify-content-end">
                        <li className="page-item"><span className="page-link" onClick={()=>this.setPage(1)}>First</span></li>
                        <li className="page-item"><span className="page-link" onClick={()=>this.setPage(this.state.currentPage-1)}>{'<'}</span></li>
                        <li className="page-item"><span className="page-link" onClick={()=>this.setPage(this.state.currentPage+1)}>{'>'}</span></li>
                        <li className="page-item"><span className="page-link" onClick={()=>this.setPage(this.state.totalPages)}>Last</span></li>
                        <li className="page-item"><span className="page-link"> {`${this.state.currentPage} / ${this.state.totalPages}`}</span></li>
                    </ul>
                </>
                    :
                    <div className="alert alert-danger">No data found</div>
                }
            </div>
        )
    }
}

export default CustomTable;
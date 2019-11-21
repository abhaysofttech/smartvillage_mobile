export interface States{
    statename:string;
    statenameHindi:string;
    statenameMarathi:string;
}

export interface Division{
    statename:string;
    divisionname:string;
    divisionnameHindi:string;
    divisionnameMarathi:string;
}

export interface District{
    statename:string;
    divisionname:string;
    districtname:string;
    districtnameHindi:string;
    districtnameMarathi:string;
}

export interface Tehsils{
    statename:string;
    divisionname:string;
    districtname:string;
    tehsilsname:string;
    tehsilsnameHindi:string;
    tehsilsnameMarathi:string;
    
}
export interface MahaNagarPalika{
    statename:string;
    divisionname:string;
    districtname:string;
    mahanagarpalikaname:string;
    mahanagarpalikanameHindi:string;
    mahanagarpalikanameMarathi:string;
}
export interface NagarPalika{
    statename:string;
    divisionname:string;
    districtname:string;
    nagarpalikaname:string;
    nagarpalikanameHindi:string;
    nagarpalikanameMarathi:string;
}
export interface NagarPanchayat{
    statename:string;
    divisionname:string;
    districtname:string;
    nagarpanchayatname:string;
    nagarpanchayatnameHindi:string;
    nagarpanchayatnameMarathi:string;
}
export interface GramPanchayat{
    statename:string;
    divisionname:string;
    districtname:string;
    tehsilsname:string;
    grampanchayatname:string;
    grampanchayatnameHindi:string;
    grampanchayatnameMarathi:string;
}

export interface Ward{
    statename:string;
    divisionname:string;
    districtname:string;
    tehsilsname?:string;
    mahanagarpalikaname?:string;
    nagarpalikaname?:string;
    nagarpanchayatname?:string;
    grampanchayatname?:string;
    wardname:string;
    wardnameHindi:string;
    wardnameMarathi:string;
}
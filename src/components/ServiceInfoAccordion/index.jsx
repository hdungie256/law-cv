import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';
import { Chip, FormControl, InputLabel, TextField } from '@mui/material';
import './index.scss'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export default function ServiceInfoAccordion(props) {
  const [country, setCountry] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCountry(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      },
    },
  };


  const [info, setInfo] = useState({dtype: 'đơn hàng'})

  const setInitial = (values) => {
    if (props.type === 'nhãn hiệu'  || props.type==='Đăng ký nhãn hiệu quốc tế'){
      setInfo({dtype: 'nhãn hiệu'})
      setNHGroup(values.group)
    }
    else if (props.type === 'KDCN'){
      setInfo({dtype: 'KDCN'})
      setGroup(values.group)
    }
    else if (props.type === 'sáng chế'){
      setInfo({dtype: 'sáng chế'})
    }
    else if (props.type === 'GPHI'){
      setInfo({dtype: 'GPHI'})
    }
    if (props.type === 'Đăng ký nhãn hiệu quốc tế' && values.country != undefined && values.country != 0){
        console.log('this', values.country)
        const countryArray = values.country.split(',');
        setCountry(countryArray)
    }
      setNhanHieu(values.name)
  }

  useEffect(() => {
      if (props.initial){
          setInitial(props.initial)
      }
  }, [])

    const [nhanhieu, setNhanHieu] = useState("")

    const handleChangeNhanHieu = (e) => {
      setNhanHieu(e.target.value);
    };
  
    const [NHgroup, setNHGroup] = useState("")
    const [group, setGroup] = useState("")

  return (
      <Accordion defaultExpanded sx={{backgroundColor:'#FEFEFE', boxShadow: 'none', border: '0.25px solid #c4c4c4', borderRadius: '5px' }} style={{width: '100%', marginTop: '20px'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography style={{ color: '#555555'}}><b>2. Thông tin {info.dtype}</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div id='dialog-service-name'>
            <div id='dialog-service-name-label-wrapper1' style={{'margin-bottom': '7px'}}> <label id='dialog-service-name-label1'> <b> Tên {info.dtype} *</b></label> </div>
            <TextField InputProps={{ inputProps: { min: 0, max: 10 } }} style={{width: '100%'}} type='text' padding='0px 10px' onChange={(e) => {handleChangeNhanHieu(e); console.log(props.type)}} value={nhanhieu} placeholder={('Tên ' + info.dtype)} />
            </div>

            {(props.type === 'nhãn hiệu' || props.type === 'Đăng ký nhãn hiệu quốc tế') &&
            <div id='dialog-service-group'>
                <div id='dialog-serivce-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label style={{color: '#6c7a99'}} id='dialog-service-group-label1'> <b> Nhóm sản phẩm</b></label> </div>
                <TextField placeholder={'Nhóm sản phẩm (1-45)'} style={{width: '100%'}} onChange={(e) => setNHGroup(e.target.value)} value={NHgroup}/>
            </div>
            }

            {(props.type === 'Đăng ký nhãn hiệu quốc tế') &&
              <div id='dialog-service-country'>
                  <div id='dialog-serivce-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label style={{color: '#6c7a99'}} id='dialog-service-group-label1'> <b> Quốc gia chỉ định bảo hộ</b></label> </div>
                  <FormControl sx={{ m: 0, width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      multiple
                      value={country}
                      onChange={handleChange}
                      input={<OutlinedInput label="Tag" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {countries.map((countryName) => (
                        <MenuItem key={countryName} value={countryName}>
                          <Checkbox checked={country.indexOf(countryName) > -1} />
                          <ListItemText primary={countryName} />
                        </MenuItem>
                      ))}
                    </Select>    
                  </FormControl>          
            </div>
            }

            {props.type === 'KDCN' &&
              <div id='dialog-service-group'>
                <div id='dialog-service-group-label-wrapper1' style={{'margin-bottom': '7px'}}> <label style={{color: '#6c7a99'}}id='dialog-service-group-label1'> <b> Phân loại</b></label> </div>
                <TextField style={{width: '100%'}} placeholder='Phân loại' type="text" onChange={(e) => setGroup(e.target.value)} value={group}/>
              </div>
            }
        </AccordionDetails>
      </Accordion>
  );
}

const countries = [
    "AE - United Arab Emirates",
    "AF - Afghanistan",
    "AG - Antigua and Barbuda",
    "AL - Albania",
    "AM - Armenia",
    "AT - Austria",
    "AU - Australia",
    "AZ - Azerbaijan",
    "BA - Bosnia and Herzegovina",
    "BG - Bulgaria",
    "BH - Bahrain",
    "BN - Brunei Darussalam",
    "BQ - Bonaire, Sint Eustatius and Saba",
    "BR - Brazil",
    "BT - Bhutan",
    "BW - Botswana",
    "BX - Benelux",
    "BY - Belarus",
    "BZ - Belize",
    "CA - Canada",
    "CH - Switzerland",
    "CL - Chile",
    "CN - China",
    "CO - Colombia",
    "CU - Cuba",
    "CV - Cabo Verde",
    "CW - Curaçao",
    "CY - Cyprus",
    "CZ - Czech Republic",
    "DE - Germany",
    "DK - Denmark",
    "DZ - Algeria",
    "EE - Estonia",
    "EG - Egypt",
    "EM - European Union",
    "ES - Spain",
    "FI - Finland",
    "FR - France",
    "GB - United Kingdom",
    "GE - Georgia",
    "GG - Guernsey",
    "GH - Ghana",
    "GM - Gambia",
    "GR - Greece",
    "HR - Croatia",
    "HU - Hungary",
    "ID - Indonesia",
    "IE - Ireland",
    "IL - Israel",
    "IN - India",
    "IR - Islamic Republic of Iran",
    "IS - Iceland",
    "IT - Italy",
    "JM - Jamaica",
    "JP - Japan",
    "KE - Kenya",
    "KG - Kyrgyzstan",
    "KH - Cambodia",
    "KP - Democratic People's Republic of Korea",
    "KR - Republic of Korea",
    "KZ - Kazakhstan",
    "LA - Lao People's Democratic Republic",
    "LI - Liechtenstein",
    "LR - Liberia",
    "LS - Lesotho",
    "LT - Lithuania",
    "LV - Latvia",
    "MA - Morocco",
    "MC - Monaco",
    "MD - Republic of Moldova",
    "ME - Montenegro",
    "MG - Madagascar",
    "MK - The Republic of North Macedonia",
    "MN - Mongolia",
    "MU - Mauritius",
    "MW - Malawi",
    "MX - Mexico",
    "MY - Malaysia",
    "MZ - Mozambique",
    "NA - Namibia",
    "NO - Norway",
    "NZ - New Zealand",
    "OA - African Intellectual Property Organization (OAPI)",
    "OM - Oman",
    "PH - Philippines",
    "PK - Pakistan",
    "PL - Poland",
    "PT - Portugal",
    "RO - Romania",
    "RS - Serbia",
    "RU - Russian Federation",
    "RW - Rwanda",
    "SD - Sudan",
    "SE - Sweden",
    "SG - Singapore",
    "SI - Slovenia",
    "SK - Slovakia",
    "SL - Sierra Leone",
    "SM - San Marino",
    "ST - Sao Tome and Principe",
    "SX - Sint Maarten (Dutch part)",
    "SY - Syrian Arab Republic",
    "SZ - Eswatini",
    "TH - Thailand",
    "TJ - Tajikistan",
    "TM - Turkmenistan",
    "TN - Tunisia",
    "TR - Türkiye",
    "TT - Trinidad and Tobago",
    "UA - Ukraine",
    "US - United States of America",
    "UZ - Uzbekistan",
    "WS - Samoa",
    "ZM - Zambia",
    "ZW - Zimbabwe"
  ]
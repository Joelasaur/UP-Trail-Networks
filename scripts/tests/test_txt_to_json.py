from txt_to_json import Converter

conv = Converter("data/", "output.json", "mqttrails")

def test_str_to_datetime():
	rawstr = "1  12:18:09 11/26/17/4"
	expected = "2017-11-26 12:18:09"
	actual = conv.str_to_datetime(rawstr)
	assert expected == actual

def test_str_to_datetime_single_hour():
	rawstr = "25  9:41:09 12/22/17/4"
	expected = "2017-12-22 09:41:09"
	actual = conv.str_to_datetime(rawstr)
	assert expected == actual

def test_str_to_datetime_extra_digit():
	rawstr = "12  16:57:59 12/11/17/4"
	expected = "2017-12-11 16:57:59"
	actual = conv.str_to_datetime(rawstr)
	assert expected == actual

def test_str_to_datetime_extra_two_digits():
	rawstr = "256  12:17:16 11/26/17/3"
	expected = "2017-11-26 12:17:16"
	actual = conv.str_to_datetime(rawstr)
	assert expected == actual